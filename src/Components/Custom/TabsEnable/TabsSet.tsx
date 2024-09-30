import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs'

interface Props {
  ItemProps: TypeItem[]
}

interface TypeItem {
  id: string
  name: string
  children: React.ReactNode
}

export default function TabsSet({ ItemProps }: Props) {
  return (
    <Tabs defaultValue={ItemProps[0]?.id} className='w-full'>
      <TabsList className='grid grid-cols-2 w-[400px]'>
        {ItemProps.map((item) => (
          <TabsTrigger key={item.id} value={item.id}>
            {item.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {ItemProps.map((item) => (
        <TabsContent key={item.id} value={item.id}>
          {item.children}
        </TabsContent>
      ))}
    </Tabs>
  )
}
