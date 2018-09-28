const Querier = require('./Querier');

module.exports = class Widget {


    static getSnippets(campaignId, random) {

        return Promise.all([
            Querier.getLatestLeads(campaignId, 20),
            Querier.getCampaignMessage(campaignId)
        ])
        .then(([leads, [{message}]]) => {

            const { first, last, city, time } = Widget.oneRandom(leads, random);
            
            return {
                message,
                leadSnippet: Widget.genMessage(first, last, city),
                timeSnippet: Widget.genTime(time)
            };

        });
    }

    static genMessage(first, last, city) {
        let name;

        if(first && last) {
            name = first + ' ' + last[0].toUpperCase() + '.';
        } else if (first) {
            name = first;
        } else {
            name = 'Someone';
        }
        if(city) {
            return name + ' from ' + city;
        }
        return name + ' from ' + ' somewhere';
    }
    
    static genTime(time) {

        if(!time) return 'Some time ago';
        const dif = divRound((new Date().getTime() - time), 1000) ;
        if (dif < 60) {
            return timeMsg(dif, 'second');
        }
        const min = divRound(dif, 60);
        if(min < 60) {
            return timeMsg(min, 'minute');
        }
        const hour = divRound(min, 60);
        if(hour < 24) {
            return timeMsg(hour, 'hour');
        }
        const day = divRound(hour, 24);
        return timeMsg(day, 'day')
    }

    static timeMsg(count, unit) {
        return count + ' ' + unit + (count > 1 ? 's' : '') + ' ago';
    }
    
    static divRound(top, bot) {
        return Math.round(top / bot);
    }

    static oneRandom(array, random) {
        if(!random) {
            throw 'Missing random number.';
        }
        if(random < 0 || random >= 1) {
            throw 'Random number must be less < 1 and >= 0.';
        }
        const index = Math.floor(random * array.length);
        return array[index];
    }
}