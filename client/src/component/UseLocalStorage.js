import React from 'react'

const PREFIX = 'User-'

export default function UseLocalStorage(key, initialValue) {

    const prefixkey = PREFIX + key;

    const [value, setValue] = React.useState(()=>{
        const jsonValue = localStorage.getItem(prefixkey)

        if(jsonValue !== null)return JSON.parse(jsonValue)

        if(typeof initialValue === 'function'){
            return initialValue()
        }else{
            return initialValue
        }

    })

    React.useEffect(()=>{
        localStorage.setItem(prefixkey,JSON.stringify(value))
    },[prefixkey,value])

    return [value, setValue]
}
