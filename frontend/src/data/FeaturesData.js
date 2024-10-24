import React from 'react';

import { BsFillShieldLockFill } from 'react-icons/bs';
import { IoIosOptions } from 'react-icons/io';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { BiSupport, BiDollar } from 'react-icons/bi';
import { GrHostMaintenance } from 'react-icons/gr';
const iconStyle = (Icon) => <Icon size="3rem" color="#0f0f0f" />;

export const featuresData = [
	{
		name: 'Event creation',
		description: 'The ability to add and manage events with its details',
		icon: iconStyle(BsFillShieldLockFill),
		imgClass: 'one',
	},
	{
		name: 'Ease of Use',
		description: 'Our system is easy to use and integrate',
		icon: iconStyle(IoIosOptions),
		imgClass: 'two',
	},
	{
		name: 'Maintenance',
		description: 'Our code is written in highest standards, which makes it highly sustainable',
		icon: iconStyle(GrHostMaintenance),
		imgClass: 'three',
	},
	{
		name: '24/7 Support',
		description: 'Our team is available at all times in case you need us',
		icon: iconStyle(BiSupport),
		imgClass: 'four',
	},
	{
		name: 'Marketing and promotion',
		description: 'The ability to market and promote events',
		icon: iconStyle(BiDollar),
		imgClass: 'five',
	},
	{
		name: 'Event analytics',
		description:
			'The ability to track and analyze event data, including attendance, revenue, and attendee feedback ',
		icon: iconStyle(AiOutlineCloudUpload),
		imgClass: 'six',
	},
];