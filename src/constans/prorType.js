import PropTypes from "prop-types";
import { ROLE } from "./roleId";

const ROLE_ID = PropTypes.oneOf(Object.values(ROLE));

export const PROP_TYPE = {
    COMMENT: PropTypes.shape({
        id: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        publishedAt: PropTypes.string.isRequired,
    }),
    POST: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        publishedAt: PropTypes.string.isRequired,
    }),
    ROLE_ID,
    ROLE: PropTypes.shape({
        id: ROLE_ID,
        name: PropTypes.string.isRequired,
    }),
    ERROR: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(null)]),
};
