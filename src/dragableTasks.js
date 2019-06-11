import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { getNestedListStyle, getNestedItemStyle } from './style';

export default class DragableTasks extends React.Component {
    render() {
        return (
            <Droppable
                droppableId={`${this.props.type}`}
                type={`droppableSubItem`}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getNestedListStyle(snapshot.isDraggingOver)}>
                        {this.props.subItems.map((item, index) => (
                            <Tasks item={item} index={index} key={item.id} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }
}

class Tasks extends React.Component {
    render() {
        return (
            <Draggable
                key={this.props.item.id}
                draggableId={`${this.props.item.id}`}
                index={this.props.index}>
                {(provided, snapshot) => (
                    <div style={{ display: 'flex' }}>
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getNestedItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                            )}>
                            {this.props.item.content}
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Draggable>
        );
    }
}
