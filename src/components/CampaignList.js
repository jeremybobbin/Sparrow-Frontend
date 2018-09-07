import React from 'react';
import Campaign from './Campaign';
import {Inject} from './Context';
import {InjectCampaign} from './Context';

const CampaignList = ({campaigns, update, remove, toggle}) =>
    campaigns.map((campaign, index) =>
        <Campaign
            {...campaign}
            key={index}
            update={(k, v) => update(campaign.id, k, v)}
            remove={() => remove(campaign.id)}
            toggle={key => toggle(campaign.id, key)}
        />);



export default Inject(CampaignList, 'campaigns', 'toggle', 'remove', 'update');





