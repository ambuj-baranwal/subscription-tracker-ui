import {INPUT_STYLES, LABEL_STYLES} from "./constants.js";


export const FormInput = ({ field, label, type = 'text', placeholder}) => {
    return (
        <field.Provider>
            {(f) => (
                <div>
                    <label className={LABEL_STYLES}>{label}</label>
                    <input
                        type={type}
                        className={INPUT_STYLES}
                        placeholder={placeholder}
                        value={f.state.value}
                        onChange={(e) => f.handleChange(e.target.value)}
                    />
                </div>
            )}
        </field.Provider>
    )
}

export const FormSelect = ({ field, label, options }) => {
    return (
        <field.Provider>
            {(f) => (
                <div>
                    <label className={LABEL_STYLES}>{label}</label>
                    <select
                        className={INPUT_STYLES}
                        value={f.state.value}
                        onChange={(e) => f.handleChange(e.target.value)}
                    >
                        {options.map((opt) => (
                            <option key={opt.value || opt} value={opt.value || opt}>
                                {opt.label || opt}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </field.Provider>
    );
};