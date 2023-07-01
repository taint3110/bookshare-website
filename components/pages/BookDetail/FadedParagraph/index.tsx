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

  return (
    <div>
      {isExpanded ? (
        <Link href="#" onClick={toggleExpand} color="">
          <Text textAlign={'justify'}>{text}</Text>
        </Link>
      ) : (
        <Text textAlign={'justify'}>
          {text.slice(0, 600)}...{' '}
          <Link href="#" onClick={toggleExpand}>
            Read more
          </Link>
        </Text>
      )}
    </div>
  )
}

export default Paragraph
