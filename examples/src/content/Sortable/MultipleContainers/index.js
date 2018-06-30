// eslint-disable-next-line import/no-unresolved
import {Sortable, Plugins} from '@shopify/draggable';

const Classes = {
  draggable: 'StackedListItem--isDraggable',
  capacity: 'draggable-container-parent--capacity',
};

export default function MultipleContainers() {
  const containers = document.querySelectorAll('#MultipleContainers .StackedList');

  if (containers.length === 0) {
    return false;
  }

  const sortable = new Sortable(containers, {
    draggable: `.${Classes.draggable}`,
    mirror: {
      constrainDimensions: true,
    },
    plugins: [Plugins.ResizeMirror],
  });

  const containerTwoCapacity = 3;
  const containerTwoParent = sortable.containers[1].parentNode;
  let currentMediumChildren;
  let capacityReached;
  let lastOverContainer;

  // --- Draggable events --- //
  sortable.on('drag:start', (evt) => {
    currentMediumChildren = sortable.getDraggableElementsForContainer(sortable.containers[1]).length;
    capacityReached = currentMediumChildren === containerTwoCapacity;
    lastOverContainer = evt.sourceContainer;
    containerTwoParent.classList.toggle(Classes.capacity, capacityReached);
  });
  function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }
  var overContainer = null;
  sortable.on('sortable:sort', (evt) => {
    overContainer= evt.dragEvent.overContainer;
    // console.log(sortable.currentOver)
    evt.cancel();
    // if(evt.dragEvent.overContainer === sortable.containers[1]) {
    //   var el = evt.dragEvent.originalSource;
    //   var cln = el.cloneNode(true);
    //   cln.style.display = 'block';
    //   insertAfter(cln,sortable.currentOver)
    //   // evt.dragEvent.overContainer.appendChild(cln);
    // }
  });
  sortable.on('sortable:stop', (evt) => {
    debugger; 
    // console.log(sortable.currentOver)
    if (evt.newContainer !== overContainer) {
      var el = evt.dragEvent.originalSource;
      var cln = el.cloneNode(true);
      cln.style.display = 'block';
      insertAfter(cln, sortable.currentOver)
      evt.cancel();
      // evt.dragEvent.overContainer.appendChild(cln);
    }
  });
  // sortable.on('sortable:sorted', (evt) => {
  //   if (lastOverContainer === evt.dragEvent.overContainer) {
  //     return;
  //   }

  //   lastOverContainer = evt.dragEvent.overContainer;
  // });

  return sortable;
}
