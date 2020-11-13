import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Map, Placemark, withYMaps, YMaps, YMapsApi } from 'react-yandex-maps'
import { Dispatch } from 'redux'
import {
    setAddress,
    setClearCrew,
    setClearCrewPlacemarks,
    setCrewPlacemarks,
    setTriggerMap,
    thunkSetCrew,
} from './store/actions/crewMapActions'
import { AppThunkDispatch, RootState } from './store/types'
import { TCrewItem } from './store/types/crewMapTypes'

const SiteMap = () => {
    const dispatch: Dispatch = useDispatch()
    const thunkDispatch: AppThunkDispatch = useDispatch()
    const crewMapReducer = (state: RootState) => state.crewMapReducer
    const { crew, address, triggerAutoComplete, mapState } = useSelector(
        crewMapReducer
    )
    const dispatched = useRef(false)
    const [stateOfMap] = useState(mapState)

    const isMap = useRef(false)

    const [ymaps, setYmaps] = useState<YMapsApi | null>(null)

    const [myLocationCoords, setMyLocationCoords] = useState<Array<
        number
    > | null>(null)

    const [myLocationPlacemarkPreset, setMyLocationPlacemarkPreset] = useState<
        object | null
    >({
        preset: 'islands#yellowPersonCircleIcon',
    })

    const [myLocationPlacemarkHint, setMyLocationPlacemarkHint] = useState<
        object | null
    >({
        hintContent: 'Хинт метки',
    })

    const onLoad = (ymaps: YMapsApi) => {
        setYmaps(ymaps)
    }

    const placemarkColor = (kind: string | null = null) => {
        if (kind) {
            return {
                preset: 'islands#yellowPersonCircleIcon',
            }
        }
        return {
            preset: 'islands#redPersonCircleIcon',
        }
    }

    const setTextHint = (text: string | null = null) => {
        if (text) {
            return {
                hintContent: text,
            }
        }
        return {
            hintContent: 'Адрес не найден',
        }
    }

    const handleOnClick = (ymaps: YMapsApi) => {
        const coords = ymaps.get('coords')
        setMyLocationCoords(coords)
        isMap.current = true
    }

    const CrewPlacmark = withYMaps((props: any) => {
        const { ymaps, crew } = props

        if (crew.data.crews_info.length === 0) return null

        const crews = crew.data.crews_info.map(
            (crew: TCrewItem) =>
                new ymaps.Placemark([crew.lat, crew.lon], {
                    ...crew,
                })
        )

        const result = ymaps.geoQuery(crews)

        result.then(() => {
            const sortedByPoint = result.sortByDistance(myLocationCoords)

            if (sortedByPoint && !dispatched.current && address) {
                dispatched.current = true
                dispatch(
                    setCrewPlacemarks(
                        sortedByPoint._objects.map(
                            (obj: { properties: any }) => obj.properties._data
                        )
                    )
                )
            }
        })

        const placemarks = crew.data.crews_info.map((crew: TCrewItem) => (
            <Placemark
                key={crew.crew_id}
                geometry={[crew.lat, crew.lon]}
                draggable={true}
                properties={{
                    hintContent: `<strong>${crew.car_mark} ${crew.car_model}</strong> <br> ${crew.car_color}`,
                }}
                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                options={{
                    preset: 'islands#greenPersonCircleIcon',
                }}
            />
        ))

        return <> {placemarks} </>
    })

    const fetch = useMemo(
        () => async (myLocationCoords: Array<number>, ymaps: YMapsApi) => {
            let result = await ymaps.geocode(myLocationCoords, {
                kind: 'house',
            })

            const firstGeoObject = result.geoObjects.get(0)

            if (firstGeoObject) {
                const res = firstGeoObject.properties.get('metaDataProperty')
                    .GeocoderMetaData

                const locality = res.Address.Components

                let listLocality = locality
                    .filter(
                        (address: { kind: string }) =>
                            address.kind === 'street' ||
                            address.kind === 'house'
                    )
                    .map((item: { name: 'string' }) => `${item.name}`)
                    .join(', ')

                const add = {
                    ...res,
                    name: listLocality,
                }

                setMyLocationPlacemarkPreset(placemarkColor(res.kind))
                setMyLocationPlacemarkHint(setTextHint(listLocality))

                dispatch(setAddress(add))

                if (isMap.current) {
                    dispatch(setTriggerMap())
                    isMap.current = false
                }

                thunkDispatch(thunkSetCrew())
            } else {
                dispatch(setAddress(null))
                if (isMap.current) {
                    dispatch(setTriggerMap())
                    isMap.current = false
                }
                dispatch(setClearCrew())
                dispatch(setClearCrewPlacemarks())

                setMyLocationPlacemarkPreset(placemarkColor())
                setMyLocationPlacemarkHint(setTextHint())
            }
        },
        [dispatch, thunkDispatch]
    )

    useEffect(() => {
        if (myLocationCoords && ymaps) {
            fetch(myLocationCoords, ymaps)
        }
        if (dispatched.current) {
            dispatched.current = false
        }

        // eslint-disable-next-line
    }, [myLocationCoords])

    useEffect(() => {
        if (address && typeof address === 'object' && ymaps) {
            const coords = address.Point.pos
                .split(' ')
                .reverse()
                .map((num: string) => +num)
            setMyLocationCoords(coords)
        } else {
            setMyLocationCoords(null)
            dispatch(setClearCrew())
            dispatch(setClearCrewPlacemarks())
        }
        // eslint-disable-next-line
    }, [triggerAutoComplete])

    return (
        <YMaps
            query={{
                apikey: 'bb808333-3c3d-4519-b25b-75631b5b12d4',
            }}
        >
            <Map
                onLoad={onLoad}
                onClick={handleOnClick}
                width="100%"
                height="40vh"
                state={stateOfMap}
                modules={['geocode', 'geoQuery', 'Placemark']}
            >
                <CrewPlacmark crew={crew} />

                {myLocationCoords && (
                    <Placemark
                        geometry={myLocationCoords}
                        draggable={true}
                        properties={{
                            ...myLocationPlacemarkHint,
                        }}
                        modules={[
                            'geoObject.addon.balloon',
                            'geoObject.addon.hint',
                        ]}
                        options={{
                            ...myLocationPlacemarkPreset,
                        }}
                    />
                )}
            </Map>
        </YMaps>
    )
}

export default SiteMap
