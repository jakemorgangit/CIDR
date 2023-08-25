document.getElementById('cidr').addEventListener('input', function () {
  document.getElementById('cidrValue').textContent = this.value;
});

function drawSubnet() {
  let subnetInput = document.getElementById('subnet').value;
  let cidrInput = parseInt(document.getElementById('cidr').value);

  if (subnetInput === '' || isNaN(cidrInput) || cidrInput < 0 || cidrInput > 32) {
    alert('Please enter a valid subnet and CIDR value.');
    return;
  }

  let hostBits = 32 - cidrInput;
  let subnetSize = Math.pow(2, hostBits);

  let subnetParts = subnetInput.split('.').map(Number);
  let subnetBinary = subnetParts.map(part => part.toString(2).padStart(8, '0')).join('');

  // Calculate the FROM address (network address)
  let fromAddressBinary = subnetBinary.substring(0, cidrInput).padEnd(32, '0');
  let fromAddressParts = [];
  for (let j = 0; j < 32; j += 8) {
    fromAddressParts.push(parseInt(fromAddressBinary.substring(j, j + 8), 2));
  }
  let fromAddress = fromAddressParts.join('.');

  // Calculate the TO address (broadcast address)
  let toAddressBinary = subnetBinary.substring(0, cidrInput).padEnd(32, '1');
  let toAddressParts = [];
  for (let j = 0; j < 32; j += 8) {
    toAddressParts.push(parseInt(toAddressBinary.substring(j, j + 8), 2));
  }
  let toAddress = toAddressParts.join('.');

  let output = `<div class="subnet">CIDR: ${cidrInput}</div>`;
  output += `<div class="subnet">Subnet Range: FROM ${fromAddress} TO ${toAddress}</div>`;
  output += `<div class="subnet">IP Addresses Available: ${subnetSize - 2}</div>`; // Subtracting 2 for the network and broadcast addresses

  document.getElementById('subnet-visualization').innerHTML = output;
}
