import { Link } from "react-router-dom";
import {
    Card, CardHeader, CardBody, CardTitle,
} from "reactstrap";
import { CardWrapperInterface } from "../../Interfaces/cardWrapper";

const CardWrapper = ({ header, title, link, content }: CardWrapperInterface) => {
    return (
        <Card className="my-2">
            <CardHeader>
                {header}
            </CardHeader>
            <CardBody>
                <CardTitle tag="h5">
                    {title}
                </CardTitle>
                <div className="text-start">
                {content.map(({id,text})=>(<p key={id}>{text}</p>))}
              
                </div>
                <Link className="m-5" to={link}>{header}</Link>
            </CardBody>
        </Card>
    )
}

export default CardWrapper;