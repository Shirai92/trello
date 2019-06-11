// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const switchColumn = (result, itemsList) => {
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    const items = reorder(itemsList, sourceIndex, destIndex);
    return items;
};

const switchTaskInTheSameColumn = (
    sourceSubItems,
    sourceIndex,
    destIndex,
    sourceParentId,
    itemsList
) => {
    const reorderedSubItems = reorder(sourceSubItems, sourceIndex, destIndex);

    const newItems = itemsList.map(item => {
        if (item.id === sourceParentId) {
            item.subItems = reorderedSubItems;
        }
        return item;
    });
    return newItems;
};

const switchTaskInDifferentColumn = (
    sourceSubItems,
    destSubItems,
    sourceIndex,
    destIndex,
    sourceParentId,
    destParentId,
    itemsList
) => {
    // Copy of lists
    const newSourceSubItems = [...sourceSubItems];
    const newDestSubItems = [...destSubItems];
    const items = itemsList;
    // // get element from column
    const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);
    // // // get element to column
    newDestSubItems.splice(destIndex, 0, draggedItem);

    const newItems = items.map(item => {
        // set new items for list 1
        if (item.id === sourceParentId) {
            item.subItems = newSourceSubItems;
            // set new items for list 2
        } else if (item.id === destParentId) {
            item.subItems = newDestSubItems;
        }
        return item;
    });
    return newItems;
};

export {
    reorder,
    switchColumn,
    switchTaskInTheSameColumn,
    switchTaskInDifferentColumn
};
