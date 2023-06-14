export function getLabelColor(labelName) {
    switch (labelName) {
      case 'approved':
        return {
          color: '#F07DEA',
          margin: '0 5px'
        };
      case 'iteung':
        return {
          color: '#A460ED', 
          margin: '0 5px' 
        };
      case 'alpha':
        return {
          color: '#7E1717', 
          margin: '0 5px' 
        };
      case 'howto':
          return {
            color: '#9FC9F3', 
            margin: '0 5px' 
          };
      case 'howto':
          return {
          color: '#22A699', 
          margin: '0 5px' 
          };
      case 'Dias':
          return {
          color: '#22A699', 
          margin: '0 5px' 
          };
      case 'Sudah Selesai':
            return {
            color: '#73BBC9', 
            margin: '0 5px' 
          };

      default:
        return {
          color: getRandomColor(),
          margin: '0 5px'
        };
    }
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  