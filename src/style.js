const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid,
    margin: 10,
    minHeight: 350,
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'lightgrey',
    // styles we need to apply on draggables
    ...draggableStyle,
    minWidth: 250
});

const getListStyle = isDraggingOver => ({
    background: '#3179BA',
    padding: 20,
    display: 'flex',
    width: '100%',
    height: '100%'
});

const getNestedItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    // userSelect: 'none',
    display: 'inline-flex',
    padding: '20px',
    margin: 10,
    width: '100%',
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',
    border: '1px solid grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getNestedListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    margin: '10px 0',
    minHeight: 300
});

export { getItemStyle, getListStyle, getNestedListStyle, getNestedItemStyle };
