'use strict';

let consumerName;
let dealersWebsite;
let dealersPhone;
let dealership;
let OEM;
let OEMPhoneNumber;
let date;
let vehicle;
let timeEstimate;

const rejections = [
  {
    category: 'rejections',
    disposition:
      'No longer owns / Never owned / Wrong email address / Destroyed or totaled',
    id: 'r1',
    template: `Hi ${
      consumerName ? consumerName : '[CONSUMER’S NAME]'
    },\n\nThanks for letting us know.\n\nIf you change your mind and want us to repair that recall at no cost to you, you can schedule a free repair appointment using this link: ${
      dealersWebsite ? dealersWebsite : '[LINK]'
    } or call us directly at ${
      dealersPhone ? dealersPhone : '[DEALERSHIP PHONE]'
    }.\n\nIf you have any questions or need further assistance, please reply to this email and we’ll be happy to help.\n\nHave a wonderful day!\n\n${
      dealership ? dealership : '[DEALERSHIP]'
    }\nRecall Department`,
  },
  {
    category: 'rejections',
    disposition: 'Prefers another dealership / Drive is too far',
    id: 'r2',
    template: `Hi ${
      consumerName ? consumerName : '[CONSUMER’S NAME]'
    },\n\nThank you for your response.\n\nAlthough you may service your vehicle at another dealership, we have a Recall Department with certified trained technicians and the parts ready to service your vehicle.\n\nThe most important thing for us, however, is that you get this safety recall repaired quickly. You can have this repaired at any Authorized ${
      OEM ? OEM : '[OEM]'
    } Dealership at no cost to you. We recommend calling dealerships ahead to make sure the parts for your recall are available.\n\nSo please let us know how we can help, and if you change your mind and decide to schedule with us simply reply to this email and we’ll take care of you.\n\nHave a wonderful day!\n\n${
      dealership ? dealership : '[DEALERSHIP]'
    }\nRecall Department`,
  },
  {
    category: 'rejections',
    disposition: 'Handle on their own',
    id: 'r3',
    template: `Hi ${
      consumerName ? consumerName : '[CONSUMER’S NAME]'
    },\n\nThanks for letting us know.\n\nIf you change your mind and want us to repair that recall at no cost to you, you can schedule a free repair appointment using this link: ${
      dealersWebsite ? dealersWebsite : '[LINK]'
    } or call us directly at ${
      dealersPhone ? dealersPhone : '[DEALERSHIP PHONE]'
    }.\n\nIf you have any questions or need further assistance, please reply to this email and we’ll be happy to help.\n\nHave a wonderful day!\n\n${
      dealership ? dealership : '[DEALERSHIP]'
    }\nRecall Department`,
  },
  {
    category: 'rejections',
    disposition: 'Out of the area / Consumer to contact dealership later',
    id: 'r4',
    template: `Hi ${
      consumerName ? consumerName : '[CONSUMER’S NAME]'
    },\n\nThank you for letting us know.\n\nWhen you decide to have the recall on your vehicle repaired, you can schedule an appointment using this link: ${
      dealersWebsite ? dealersWebsite : '[LINK]'
    } or call us directly at ${
      dealersPhone ? dealersPhone : '[DEALERSHIP PHONE]'
    }.\n\nAs a reminder, this recall will be repaired at no cost to you.\n\nHave a wonderful day!\n\n${
      dealership ? dealership : '[DEALERSHIP]'
    }\nRecall Department`,
  },
];

const customerSupport = [
  {
    category: 'customer-support',
    disposition: 'Callback requested',
    id: 'cs1',
    template: `[ACKNOWLEDGE CONCERN]\n\nI will send your information to one of our Service Advisors for follow-up.\n\nFor a quicker response, you may call us directly at ${
      dealersPhone ? dealersPhone : '[DEALERSHIP PHONE]'
    }.\n\nThank you,\n\n${
      dealership ? dealership : '[DEALERSHIP]'
    }\nRecall Department`,
  },
  {
    category: 'customer-support',
    disposition: 'Reimbursement',
    id: 'cs2',
    template: `Hi ${
      consumerName ? consumerName : '[CONSUMER’S NAME]'
    },\n\nFor reimbursement, you’ll need to contact ${
      OEM ? OEM : '[OEM]'
    } directly at ${
      OEMPhoneNumber ? OEMPhoneNumber : '[OEM PHONE NUMBER]'
    } and submit a reimbursement claim.\n\nIn the future, please come to us for any factory recalls and we will repair them at no cost to you!\n\nHave a great day,\n\n${
      dealership ? dealership : '[DEALERSHIP]'
    }\nRecall Department`,
  },
  {
    category: 'customer-support',
    disposition: 'Trouble calling into dealership',
    id: 'cs3',
    template: `Hi ${
      consumerName ? consumerName : '[CONSUMER’S NAME]'
    },\n\nI’m happy to help schedule your appointment via email, do you have a preferred date and time in mind?\n\nAlso, you can visit this link to schedule directly into our system: ${
      dealersWebsite ? dealersWebsite : '[LINK]'
    }.\n\nIf you do try calling us again, I want to make sure you have the right number: ${
      dealersPhone ? dealersPhone : '[DEALERSHIP PHONE]'
    }.\n\nPlease let us know how we can help!\n\nThank you,\n\n${
      dealership ? dealership : '[DEALERSHIP]'
    }\nRecall Department`,
  },
  {
    category: 'customer-support',
    disposition: 'Still receiving emails',
    id: 'cs4',
    template: `Hi ${
      consumerName ? consumerName : '[CONSUMER’S NAME]'
    },\n\nI have removed this email from our recall alert list.\n\nHave a great day,\n\n${
      dealership ? dealership : '[DEALERSHIP]'
    }\nRecall Department`,
  },
];

const recallAppStatus = [
  {
    category: 'recall-app-status',
    disposition: 'Active recall',
    id: 'ras1',
    template: `Hi ${
      consumerName ? consumerName : '[CONSUMER’S NAME]'
    },\n\nOur records indicate that you have an active recall.\n\nWe can take care of this recall at no cost to you, let's schedule an appointment for the next available date, ${
      date ? date : '[DATE]'
    }.\n\nDoes this work for you?\n\n${
      dealership ? dealership : '[DEALERSHIP]'
    }\nRecall Department`,
  },
  {
    category: 'recall-app-status',
    disposition: 'No active recalls',
    id: 'ras2',
    template: `Hi ${
      consumerName ? consumerName : '[CONSUMER’S NAME]'
    },\n\nThank you for your response.\n\nOur records show that you currently do not have any active recalls on your vehicle.\n\nThis could be that the recall was completed on the vehicle, or that the recall is no longer applicable.\n\nPlease consult the notification you received from us for additional information and a contact number for our dealership should you have additional questions or scheduling needs.\n\nHave a wonderful day!\n\n${
      dealership ? dealership : '[DEALERSHIP]'
    }\nRecall Department`,
  },
  {
    category: 'recall-app-status',
    disposition: 'No active recalls',
    id: 'ras3',
    template: `Hi ${
      consumerName ? consumerName : '[CONSUMER’S NAME]'
    },\n\nThank you for informing us, we’ll update our records accordingly, and you may disregard future email notifications pertaining to this specific recall.\n\nPlease consult the notification you received from us for additional information and the contact number for our dealership should you have additional questions or scheduling needs.\n\nWe appreciate you being proactive in repairing your vehicle to make the road a safer place for all of us.\n\nHave a wonderful day!\n\n${
      dealership ? dealership : '[DEALERSHIP]'
    }\nRecall Department`,
  },
  {
    category: 'recall-app-status',
    disposition: 'Consumer already has a scheduled appointment',
    id: 'ras4',
    template: `Hi ${
      consumerName ? consumerName : '[CONSUMER’S NAME]'
    },\n\nGreat, we look forward to seeing you then!\n\nIn the meantime, if you have any questions or need further assistance, please reply to this email or call us directly at ${
      dealersPhone ? dealersPhone : '[DEALERSHIP PHONE]'
    } and we’ll be happy to help.\n\nHave a wonderful day!\n\n${
      dealership ? dealership : '[DEALERSHIP]'
    }\nRecall Department`,
  },
  {
    category: 'recall-app-status',
    disposition: 'Consumer already has s scheduled appointment',
    id: 'ras5',
    template: `Hi ${
      consumerName ? consumerName : '[CONSUMER’S NAME]'
    },\n\nWe have you scheduled for your ${
      vehicle ? vehicle : '[VEHICLE]'
    } on ${
      date ? date : '[DATE]'
    }.\n\nIf you have any further questions or requests, feel free to contact us at ${
      dealersPhone ? dealersPhone : '[DEALERSHIP PHONE]'
    }.\n\nHave a great day!\n\n${
      dealership ? dealership : '[DEALERSHIP]'
    }\nRecall Department`,
  },
  {
    category: 'recall-app-status',
    disposition: 'Time estimates',
    id: 'ras6',
    template: `Hi ${
      consumerName ? consumerName : '[CONSUMER’S NAME]'
    },\n\nThis repair may take up to ${
      timeEstimate ? timeEstimate : '[HALF / FULL DAY]'
    }. This is an estimate, and your service advisor will provide a more accurate completion time when you arrive.\n\nWe encourage you to schedule your appointment right now via this link: ${
      date ? date : '[DATE]'
    }.\n\nYou can also call us directly at ${
      dealersPhone ? dealersPhone : '[DEALERSHIP PHONE]'
    }, or reply to this email with a preferred date/time and we’ll be happy to schedule you.\n\nHave a wonderful day!\n\n${
      dealership ? dealership : '[DEALERSHIP]'
    }\nRecall Department`,
  },
  {
    category: 'recall-app-status',
    disposition: 'Parts not available',
    id: 'ras7',
    template: `Hi ${
      consumerName ? consumerName : '[CONSUMER’S NAME]'
    },\n\nThe parts for this recall are currently not available, as we are awaiting additional parts from the manufacturer.\n\nI am going to make note of this in my system and will do my best to follow up with you to make sure we get this recall appointment scheduled asap.\n\nYou are of course welcome to contact us at any time to check the status of the parts. Thank you for being patient and proactive with us.\n\nHave a great day!\n\n${
      dealership ? dealership : '[DEALERSHIP]'
    }\nRecall Department`,
  },
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const $rejectionsSection = $('#rejections-ul');
const $emailSection = $('#email-section');
const $customerSupportSection = $('#customer-support-ul');
const $recallAppStatusSection = $('#recall-appt-status-ul');

const displaySection = (arr, section) => {
  arr.forEach(({ id, disposition, category }) => {
    const html = `
      <li class="dispo-container">
        <p>${disposition}</p>
        <div class="btns-container">
          <button class="btn btn-generator" data-dispo="${id} ">Generate email</button>
          <button class="btn btn-template" data-dispo="${id}">Empty template</button>
        </div>
      </li>
    `;
    section.insertAdjacentHTML('beforeend', html);
  });
};

const copyToClipboard = (content) => {
  navigator.clipboard.writeText(content);
};

displaySection(rejections, $rejectionsSection);
displaySection(customerSupport, $customerSupportSection);
displaySection(recallAppStatus, $recallAppStatusSection);

const $$emptyTemplateBtns = $$('.btn-template');

$$emptyTemplateBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    $emailSection.classList.remove('hidden');
    const id = e.target.getAttribute('data-dispo');
    const { template } = [
      ...recallAppStatus,
      ...rejections,
      ...customerSupport,
    ].find((dispo) => dispo.id === id);
    document.querySelector('#email').textContent = template;
  });
});

$('#email')?.addEventListener('click', (e) =>
  copyToClipboard(e.target.textContent)
);