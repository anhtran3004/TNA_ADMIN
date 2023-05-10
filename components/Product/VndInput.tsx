import React from "react";
import {NumericFormat} from "react-number-format";

interface Props {
    value: number;
    onChange: (value: number) => void;
}

const VndInput: React.FC<Props> = ({ value, onChange }) => {
    const handleValueChange = (values: any) => {
        const { value } = values;
        onChange(value);
    };

    return (
        <NumericFormat
            value={value}
            onValueChange={handleValueChange}
            thousandSeparator={true}
            suffix={" VND"}
            allowNegative={false}
            decimalScale={0}
            prefix={""}
        />
    );
};

export default VndInput;