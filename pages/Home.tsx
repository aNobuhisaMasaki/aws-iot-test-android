import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Amplify, { API, graphqlOperation } from 'aws-amplify'
import config from '../aws-exports'
Amplify.configure(config)
import { listBlogs } from '../graphql/queries'

export default function Home() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    fetchBlogs()
  }, [])

  async function fetchBlogs() {
    try {
      const blogData = await API.graphql(graphqlOperation(listBlogs))
      const blogs = blogData.data.listBlogs.items
      setBlogs(blogs)
    } catch (err) {
      console.log('error fetching blogs')
    }
  }

  return (
    <View style={{ ...styles.container, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Text>{JSON.stringify({ blogs }, null, 2)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
