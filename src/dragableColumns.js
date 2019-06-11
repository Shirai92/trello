import React, { Component } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { getItemStyle, getListStyle } from './style';
import DragableTasks from './dragableTasks';

class DragableColumn extends Component {
    render() {
        return (
            <Draggable
                key={this.props.item.id}
                draggableId={`${this.props.item.id}`}
                index={this.props.index}>
                {(provided, snapshot) => (
                    <div>
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                            )}>
                            {this.props.item.content}
                            <DragableTasks
                                subItems={this.props.item.subItems}
                                type={this.props.item.id}
                            />
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Draggable>
        );
    }
}

export default class Column extends Component {
    render() {
        return (
            <Droppable
                droppableId="droppable"
                type="droppableItem"
                direction="horizontal">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        {this.props.items.map((item, index) => (
                            <DragableColumn
                                item={item}
                                index={index}
                                key={item.id}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        );
    }
}
