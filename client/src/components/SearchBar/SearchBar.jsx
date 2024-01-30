import { Input } from '@nextui-org/react'
import { SearchIcon } from '@nextui-org/shared-icons'
import React from 'react'

const SearchBar = () => {
    return (
        <div>
            <Input
                classNames={{
                    base: "max-w-full sm:max-w-[15rem] h-10",
                    mainWrapper: "h-full",
                    input: "text-small",
                    inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                }}
                placeholder="Enter a city, address or pincode"
                size="sm"
                startContent={<SearchIcon size={18} />}
                type="search"
            />
        </div>
    )
}

export default SearchBar