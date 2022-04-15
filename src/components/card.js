import React from 'react';
import '../App.css';

function Card(props) {
    const { videoDetails } = props
    const {
        description,
        thumbnails: { medium: imageDetails },
        title,
        publishTime,
        channelTitle
    } = videoDetails.snippet

    const renderDateTime = (str) => {
        return new Date(str).toDateString()
    }

    return (
        <div className='cardDiv'>
            <div>
                <img
                    src={imageDetails.url}
                    width={imageDetails.width}
                    height={imageDetails.height}
                    alt={channelTitle}
                />
            </div>
            <div data-testid="title">{title}</div>
            <div data-testid="description" className='description'><strong>Description:</strong> {description ?? '-'}</div>
            <div data-testid="channel"><strong>Channel:</strong> {channelTitle}</div>
            <div data-testid="publish"><strong>Publish:</strong> {renderDateTime(publishTime)}</div>
        </div>
    )
}

export default Card;
