import React from 'react';
import Campaign from './Campaign';

const CampaignList = (props) => {
    console.log(props);
    return props.campaigns === undefined ? null : (props.campaigns.map((c, index) => <Campaign
        id={c.id}
        key={index}
        name={c.name}
        url={c.url}
        leadCount={c.leads}
        effect={c.effect}
        tracking={c.tracking}
        isEnabled={c.enabled}
        update={(k, v) => props.update(c.id, k, v)}
        location={c.location}
        message={c.message}
        remove={() => props.remove(c.id)}
        toggle={prop => props.toggle(c.id, prop)}
        toLeads={() => props.toLeads(c.id)}
    />))
}
export default CampaignList;