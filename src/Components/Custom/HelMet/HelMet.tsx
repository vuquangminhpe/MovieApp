import { Helmet, HelmetProvider } from 'react-helmet-async'
interface Props {
  title: string
}
export default function HelMet({ title }: Props) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={`${title}`} />
      </Helmet>
    </HelmetProvider>
  )
}
