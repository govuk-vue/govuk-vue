//Adapted from https://stackoverflow.com/a/64167032
import { useSlots } from 'vue'

export default function useGetSlotText(name: string) {
  const slots = useSlots()
  if (slots && slots[name]) {
    // @ts-ignore
    return getSlotText(slots[name]())
  }
}

function getSlotText(items: any[]) {
  const texts: string[] = items.map((item) => {
    if (!item.children) {
      return ''
    } else if (typeof item.children === 'string') {
      return item.children
    } else if (Array.isArray(item.children)) {
      return getSlotText(item.children)
    } else if (item.children['default']) {
      return getSlotText(item.children['default']())
    }
  })
  return texts.join(' ')
}
