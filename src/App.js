import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './dragableColumns';
import { static_items } from './items';
import {
  switchColumn,
  switchTaskInTheSameColumn,
  switchTaskInDifferentColumn
} from './helpers';
import Header from './header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: static_items
    };
  }

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    // Column reorder
    if (result.type === 'droppableItem') {
      const items = switchColumn(result, this.state.items);
      this.setState({
        items
      });
      // Task reorder
    } else if (result.type === 'droppableSubItem') {
      const sourceParentId = Number(result.source.droppableId);
      const sourceIndex = result.source.index;
      const destIndex = result.destination.index;

      const destParentId = Number(result.destination.droppableId);

      // extract subItems list and assign it to acc[id]
      const itemSubItemMap = this.state.items.reduce((acc, item) => {
        acc[item.id] = item.subItems;
        return acc;
      }, {});

      // get list of subItems based on columns id
      const sourceSubItems = itemSubItemMap[sourceParentId];
      const destSubItems = itemSubItemMap[destParentId];

      // Task reorder in the same column
      if (sourceParentId === destParentId) {
        const newItems = switchTaskInTheSameColumn(
          sourceSubItems,
          sourceIndex,
          destIndex,
          sourceParentId,
          this.state.items
        );
        this.setState({
          items: newItems
        });

        // Task reorder in the different column
      } else {
        const newItems = switchTaskInDifferentColumn(
          sourceSubItems,
          destSubItems,
          sourceIndex,
          destIndex,
          sourceParentId,
          destParentId,
          this.state.items
        );
        this.setState({
          items: newItems
        });
      }
    }
  };

  render() {
    return (
      <div>
        <Header />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Column items={this.state.items} />
        </DragDropContext>
      </div>
    );
  }
}

export default App;
