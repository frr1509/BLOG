import PropTypes from "prop-types";
import { forwardRef } from "react";
import styled from "styled-components";

const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
    return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
    width: ${({ width = "100%" }) => width};
    height: 40px;
    margin: 0px 0px 10px;
    border: 1px solid #000;
    font-size: 18px;
    padding: 10px;
`;

Input.propTypes = {
    width: PropTypes.string,
};
