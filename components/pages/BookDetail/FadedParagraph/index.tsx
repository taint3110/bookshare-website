import { Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useState } from 'react'

interface ParagraphProps {
  text: string
}

const Paragraph: React.FC<ParagraphProps> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  if (text)
    if (text.length <= 600) {
      return (
        <>
          <Text textAlign={'justify'}>{text}</Text>
        </>
      )
    }
  return (
    <div>
      {isExpanded ? (
        <Link href="#" onClick={toggleExpand}>
          <Text textAlign={'justify'}>{text}</Text>
        </Link>
      ) : (
        <Text textAlign={'justify'}>
          {text.slice(0, 540).trim()}...{' '}
          <Link href="#" onClick={toggleExpand}>
            <Text display={'inline-flex'} color={'teal.500'}>
              Read more
            </Text>
          </Link>
        </Text>
      )}
    </div>
  )
}

export default Paragraph
