import React from 'react';
import Loading from '../assets/loading.svg';

export function PrimaryButton({ value, style, loading }) {
    return (
        <>
            <button
                type='submit'
                style={style}
                className='primary-button'
            >
                {loading
                    ?
                    <img src={Loading} className='loading-spinner' alt="loading-gif" />
                    :
                    value
                }
            </button>

        </>

    )
}

export function AuthInput({ value, style, onChange, type, placeholder, error }) {
    return (
        <input
            type={type}
            style={{ ...style, border: `${error ? '2px solid #f96363' : 'none'}` }}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className='auth-input'
        />
    )
}
