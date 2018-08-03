// import React from 'react';
// import Modal from 'react-modal';

// import '../css/components/modal.css';


// Modal.setAppElement('#root');

// const CampaignSettings = props =>
//     <div className='modal'>
//         <Modal
//             isOpen={props.isOpen}
//             onAfterOpen={props.afterOpenModal}
//             onRequestClose={props.closeModal}
//             contentLabel="Example Modal"
//         >
//             <span onClick={() => props.close()} className="close">&times;</span>
//             <input type='text' value={props.campaign.name} onChange={(e) => props.update('name', e.target.value)}/>
//             <input type='text' value={props.campaign.url} onChange={(e) => props.update('url', e.target.value)}/>
//             <select>
//                 <option value="top-left">Top Left</option>
//                 <option value="top-right">Top Right</option>
//                 <option value="bottom-left">Bottom Left</option>
//                 <option value="bottom-right">Bottom Right</option>
//             </select>
//         </Modal>
//     </div>;


// export default CampaignSettings;