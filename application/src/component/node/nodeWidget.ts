import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import react from "react";
import { mailGroupNodeModel } from "./widget/models/nodeModel";

export interface MailNodeWidgetProps {
    node: mailGroupNodeModel
    engine: DiagramEngine
}

export interface MailNodeWidgetState {}

export class MailNodeWidget extends react.Component<
    MailNodeWidgetProps,
    MailNodeWidgetState
> {
    constructor(props) {
        super(props)
    }
    
    
    
}