export const convertTime = (timeStr) => {
	const [time, modifier] = timeStr.split(' ');
	let [hours, minutes] = time.split(':');
	if (hours === '12') {
		hours = '00';
	}
	if (modifier === 'PM') {
		hours = parseInt(hours, 10) + 12;
	}
	return `${hours}:${minutes}`;
};

export const convert24Hto12H = (time) => {
	var dt = new Date(time);
	var hours = dt.getHours(); // gives the value in 24 hours format
	var AmOrPm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12 || 12;
	var minutes = dt.getMinutes();
	return `${hours < 10 ? '0'+hours : hours}:${minutes <10 ? '0'+minutes : minutes} ${AmOrPm}`;
};
