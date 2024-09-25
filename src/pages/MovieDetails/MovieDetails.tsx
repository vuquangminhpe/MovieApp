import { useNavigate, useParams } from 'react-router-dom'
import { getIdFromNameId } from '../../utils/utils'

export default function MovieDetails() {
  const { movieId } = useParams()
  const navigate = useNavigate()
  const id = getIdFromNameId(movieId as string)
  console.log(id)

  return <div>MovieDetails</div>
}
