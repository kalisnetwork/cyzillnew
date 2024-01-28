import 'react-phone-number-input/style.css'
import Input from 'react-phone-number-input/input'
import { useEffect, useState } from 'react'

const PhoneInput = ({ setPhoneNumber }) => {
    const [value, setValue] = useState()

    useEffect(() => {
        setPhoneNumber(value);
    }, [value]);

    return (
        <Input
            country="IN"
            defaultCountry="IN"
            international
            withCountryCallingCode
            value={value}
            onChange={setValue}
            className="w-full text-primary h-14 border-2 border-gray-300 rounded-xl px-4 outline-none shadow-sm max-w-xs mx-auto hover:border-gray-400 focus:border-primary" />
    )
}

export default PhoneInput
