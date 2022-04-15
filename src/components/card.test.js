// __tests__/card.test.js
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Card from './card'

test('loads and displays youtube card with details', async () => {
    const props = {
        snippet: {
            description: 'test description',
            thumbnails: {
                medium: {
                    url: 'test url',
                    width: '200px',
                    height: '100px'
                }
            },
            title: 'test title',
            publishTime: '2021-09-06T07:34:30Z',
            channelTitle: 'test channel'
        }
    }
    render(<Card videoDetails={props} />)

    expect(screen.getByTestId('title')).toHaveTextContent(props.snippet.title)
    expect(screen.getByTestId('description')).toHaveTextContent(props.snippet.description)
    expect(screen.getByTestId('channel')).toHaveTextContent(props.snippet.channelTitle)
    expect(screen.getByTestId('publish')).toHaveTextContent('Mon Sep 06 2021')
})