import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {save} from '../service/service';

const SubmissionForm = () => {
 const [title, setTitle] = useState("");
 const [authors, setAuthors] = useState("");
 const [source, setSource] = useState("");
 const [doi, setDoi] = useState("");
 const [pubyear, setPubyear] = useState(new Date().getFullYear());
 const [claim, setClaim] = useState('TDD');
 const onSubmit = () => {
     let params = {
         title, authors,source,doi,pubyear,claim
     }
     save(params).then(rs => {
         alert('save success');
         window.location.reload();
     }).catch(rs => {
        alert(rs.response.data);
     });
 };
 return (
 <div >
 <input name="title" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Title" />
 <p><input name="authors" onChange={(e) => setAuthors(e.target.value)} value={authors}  placeholder="Authors" /></p>
 <p><input name="source" onChange={(e) => setSource(e.target.value)} value={source}  placeholder="Source" /></p>
 <p><input name="pubyear" placeholder="Publication Year" value={pubyear} onChange={(e) => setPubyear(e.target.value)} maxLength="4"/></p>
 <p><input name="doi" onChange={(e) => setDoi(e.target.value)} value={doi} placeholder="DOI" /></p>
 
 <select name="sepractice" value={claim} onChange={(e) => setClaim(e.target.value)}>
 <option value="">Select SE practice...</option>
 <option value="TDD">TDD</option>
 <option value="Mob Programming">Mob Programmin</option>
 </select>
 <br/>
 <button onClick={() => onSubmit()}>Submit</button>
 </div>
 );
}
export default SubmissionForm;