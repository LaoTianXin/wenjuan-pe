import React from 'react'
import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

type SortableContainerProps = {
  children: React.ReactNode
  items: {
    id: UniqueIdentifier
    [key: string]: any
  }[]

  onDragEnd: (oldIndex: number, newIndex: number) => void
}

const SortableContainer: React.FC<SortableContainerProps> = ({ children, items, onDragEnd }) => {
  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 8 } }))

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )

  function handleDragEnd(event: { active: any; over: any }) {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = items.findIndex(item => item.id === active.id)
      const newIndex = items.findIndex(item => item.id === over.id)
      onDragEnd(oldIndex, newIndex)
    }
  }
}

export default SortableContainer
