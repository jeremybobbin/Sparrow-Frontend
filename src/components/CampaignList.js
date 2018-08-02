import React from 'react';
import Campaign from './Campaign';

const CampaignList = (props) =>
    props.campaigns.map((c, index) => <Campaign
        remove={() => props.remove(c.id)}
        id={c.id}
        key={c.id}
        name={c.name}
        url={c.url}
        leads={c.leads}
    />
);

export default CampaignList;