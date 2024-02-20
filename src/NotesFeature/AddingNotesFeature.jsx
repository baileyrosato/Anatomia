import { Flex } from "@mantine/core";
import "./AddingNotes.css"
import { useEffect, useState } from 'react';

export default function Notes({content, onContentChange}){
    const [localContent, setLocalContent] = useState(content);
    
    useEffect(() => {
        setLocalContent(content);
    }, [content]);

    const handleChange = (event) => {
        setLocalContent(event.target.value);
        onContentChange(event.target.value);
    }

    return (
        <div className="Note" >
            <div className="noteHeader">
                <div>Notes: </div>
            </div>
            <textarea value={localContent} onChange={handleChange} name="" id="" cols="30" rows="15"></textarea>
        </div>
    )
 }
