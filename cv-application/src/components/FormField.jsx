import React from 'react';
export default function FormField({
    label,
    name,
    value,
    type = 'text',
    placeholder = '',
    onChange,
    textarea = false,
}){
    return (
        <div style={{ marginBottom: 8 }}>
            {/* Label is associated with the input by `name` attribute */}
            <label htmlFor={name} style={{ display:'block', fontSize:12, color:'#333', marginBottom:4 }}>
                {label}
            </label>

            {textarea ? (
            <textarea
                id={name}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                rows={4}
                style={{ width:'100%', padding:8, borderRadius:6 }}
            />
            ) : (
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                style={{ width:'100%', padding:8, borderRadius:6 }}
            />
            )}
        </div>
    );
}