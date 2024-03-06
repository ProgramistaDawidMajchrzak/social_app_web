import React from 'react'

export function PrimaryButton({ value, style, onClick }) {
    return (
        <input
            type='submit'
            style={style}
            value={value}
            onClick={onClick}
            className='primary-button'
        />
    )
}

export function AuthInput({ value, style, onChange, type, placeholder }) {
    return (
        <input
            type={type}
            style={style}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className='auth-input'
        />
    )
}
