import styled from "styled-components";
import { H2, Icon } from "../../../../components";
import { SpecialPanel } from "../specialPanel/specialPanel";
import { useNavigate } from "react-router-dom";
import { PROP_TYPE } from "../../../../constans";

const PostContentContainer = ({
    className,
    post: { id, title, imageUrl, content, publishedAt },
}) => {
    const navigate = useNavigate();

    return (
        <div className={className}>
            <img src={imageUrl} alt={title} />
            <H2>{title}</H2>
            <SpecialPanel
                id={id}
                publishedAt={publishedAt}
                margin="-20px 0 20px"
                editButton={
                    <Icon
                        inactive={true}
                        id="fa-pencil-square-o"
                        size="21px"
                        margin="0 10px 0 0"
                        onClick={() => navigate(`/post/${id}/edit`)}
                    />
                }
            />
            <div className="post-text">{content}</div>
        </div>
    );
};

export const PostContent = styled(PostContentContainer)`
    & img {
        float: left;
        margin: 0 20px 10px 0;
    }

    & .post-text {
        fonst-size: 18px;
        white-space: pre-line;
    }
`;

PostContent.propTypes = {
    post: PROP_TYPE.POST.isRequired,
};
