import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Axios from 'axios'
import throttle from 'lodash/throttle'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import {
    setAddress,
    setTriggerAutoComplete,
} from './store/actions/crewMapActions'
import { RootState } from './store/types'
import { TObjectType } from './store/types/crewMapTypes'

const Search = (props: { isValid: boolean }) => {
    const { isValid } = props
    const dispatch: Dispatch = useDispatch()
    const crewMapReducer = (state: RootState) => state.crewMapReducer
    const [options, setOptions] = useState<Array<object>>([])
    const [value, setValue] = useState<{} | null>(null)
    const [inputValue, setInputValue] = useState<string>('')
    const { address, triggerMap, city } = useSelector(crewMapReducer)

    const fetch = React.useMemo(
        () =>
            throttle(
                (
                    request: string,
                    callback: (results?: Array<object>) => void
                ) => {
                    Axios.get(
                        `https://geocode-maps.yandex.ru/1.x/?apikey=bb808333-3c3d-4519-b25b-75631b5b12d4&format=json&geocode=${city},${request}`
                    )
                        .then(res => {
                            const rest: object[] = res.data.response.GeoObjectCollection.featureMember.map(
                                (obj: { GeoObject: TObjectType }) => {
                                    return {
                                        ...obj.GeoObject,
                                    }
                                }
                            )

                            callback(rest)
                        })
                        .catch(er => console.log(er))
                },
                200
            ),
        // eslint-disable-next-line
        []
    )

    useEffect(() => {
        if (address instanceof Object) {
            setValue(address)
        } else if (address === null) {
            setValue({
                name: 'Адрес не найден',
            })
        } else if (address === 'string') {
            setValue(null)
        }

        // eslint-disable-next-line
    }, [triggerMap])

    useEffect(() => {
        let active = true

        if (inputValue === '') {
            setOptions(value ? [value] : [])
            return undefined
        }

        fetch(inputValue, args => {
            if (active) {
                let newOptions = [] as object[]

                if (value) {
                    newOptions = [value]
                }

                if (args) {
                    newOptions = [...newOptions, ...args]
                }

                setOptions(newOptions)
            }
        })
        return () => {
            active = true
        }
        // eslint-disable-next-line
    }, [value, inputValue, fetch])

    return (
        <Autocomplete
            noOptionsText={'Вариантов не найдено'}
            getOptionLabel={(option: TObjectType) => option.name}
            filterOptions={x => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            onChange={(_, newValue: TObjectType | null) => {
                setOptions(newValue ? [newValue, ...options] : options)
                setValue(newValue)
                dispatch(setAddress(newValue))
                dispatch(setTriggerAutoComplete())
            }}
            onInputChange={(_, newInputValue) => {
                setInputValue(newInputValue)
            }}
            renderInput={props => (
                <TextField
                    {...props}
                    autoFocus={!isValid ? true : false}
                    placeholder="Введите улицу и номер дома"
                    label="Откуда"
                    variant="outlined"
                    color="primary"
                    margin="normal"
                />
            )}
        />
    )
}

export default Search
