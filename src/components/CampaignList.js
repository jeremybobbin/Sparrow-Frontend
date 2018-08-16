import React from 'react';
import Campaign from './Campaign';

const CampaignList = (props) =>
    props.campaigns.map((c, index) => <Campaign
        toggleSettings={() => props.toggleSettings(c.id)}
        remove={() => props.remove(c.id)}
        id={c.id}
        key={index}
        name={c.name}
        url={c.url}
        leads={c.leads}
        enabled={c.enabled}
        update={(k, v) => props.update(c.id, k, v)}
        isOpen={c.isOpen}
        placement={c.placement}
        message={c.message}
    />
);

export default CampaignList;