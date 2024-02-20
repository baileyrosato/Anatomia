import { Flex } from "@mantine/core";
import "./AddingNotes.css"
import { useEffect, useState } from 'react';

export default function Notes({onClose, content, onContentChange}){
    const [localContent, setLocalContent] = useState(content);
    
    useEffect(() => {
        setLocalContent(content);
    }, [content]);

    const handleChange = (event) => {
        setLocalContent(event.target.value);
        onContentChange(event.target.value);
    }

    return (
        <div className="stickyNote" >
            <div style={{background:'rgb(240,204,187)', color:'black', padding: '10px', display: 'flex', justifyContent:'space-Between' }} className="noteHeader">
                <div>Notes: </div>
                <div  style={{ width:"35px", height:"35px", background:"rgb(219,176,154)",borderRadius:"50%", 
                display:"grid", placeContent:'center', paddingBottom:'5px', cursor:'pointer' }} className="close" onClick={onClose}> &times; </div>
            </div>
            <textarea value={localContent} onChange={handleChange} name="" id="" cols="30" rows="15"></textarea>
        </div>
    )
 }