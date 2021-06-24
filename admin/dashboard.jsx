import { Box, Link, Icon } from '@admin-bro/design-system'

const Dashboard = () => {
  return (
    <Box flex flexDirection="column" variant="grey">
      <Box flex>
        <Link href="/admin/resources/Markers/actions/new" mr="xl">
          <Box variant="card">
              Create new marker
          </Box>
        </Link>     
        <Link href="/admin/resources/Markers" mr="xl">
          <Box variant="card">
              Show all markers
          </Box>
        </Link>
      </Box>
    </Box>
  )
}

export default Dashboard