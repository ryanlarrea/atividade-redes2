function acessar_inputs() {
  var v1 = parseInt(document.getElementById("o1").value);
  var v2 = parseInt(document.getElementById("o2").value);
  var v3 = parseInt(document.getElementById("o3").value);
  var v4 = parseInt(document.getElementById("o4").value);

  if (
    v1 >= 0 &&
    v1 <= 255 &&
    v2 >= 0 &&
    v2 <= 255 &&
    v3 >= 0 &&
    v3 <= 255 &&
    v4 >= 0 &&
    v4 <= 255
  ) {
    document.getElementById("printBin").innerHTML =
      "IP em binário: " +
      printBin(v1) +
      "." +
      printBin(v2) +
      "." +
      printBin(v3) +
      "." +
      printBin(v4);

    document.getElementById("printClasse").innerHTML = printClasse(v1);

    document.getElementById("printMascara").innerHTML = printMascara(v1);

    document.getElementById("printEndRede").innerHTML = printEndRede(
      v1,
      v2,
      v3
    );

    document.getElementById("printEndHost").innerHTML = printEndHost(
      v1,
      v2,
      v3
    );

    document.getElementById("printBroadcast").innerHTML = printBroadcast(
      v1,
      v2,
      v3
    );

    document.getElementById("printValido").innerHTML = printValido(
      v1,
      v2,
      v3,
      v4
    );
  } else {
    document.getElementById("printValido").innerHTML =
      "Você deve digitar números maiores ou iguais à 0 e menores que 256!";
  }
}

function printBin(ip) {
  var resto;
  var print = "";

  while (ip > 0) {
    resto = ip % 2;
    ip = Math.trunc(ip / 2);
    print = resto + print;
  }

  while (print.length != 8) {
    print = "0" + print;
  }
  return print;
}

function printClasse(ip) {
  var print = "";
  if (ip >= 1 && ip <= 126) {
    print = "Classe: A";
  } else if (ip == 127) {
    print = "IP reservado para LAN";
  } else if (ip >= 128 && ip <= 191) {
    print = "Classe: B";
  } else if (ip >= 192 && ip <= 223) {
    print = "Classe: C";
  } else if (ip >= 224 && ip <= 239) {
    print = "Classe: D";
  } else if (ip >= 240 && ip <= 254) {
    print = "Classe: E";
  } else {
    print = "Inválido!";
  }
  return print;
}

function printMascara(ip) {
  var print = "";
  if (ip >= 1 && ip <= 126) {
    print = "Máscara: 255.0.0.0 // Função Máscara: REDE.HOST.HOST.HOST";
  } else if (ip == 127) {
    print = "IP reservado para LAN";
  } else if (ip >= 128 && ip <= 191) {
    print = "Máscara: 255.255.0.0 // Função Máscara: REDE.REDE.HOST.HOST";
  } else if (ip >= 192 && ip <= 223) {
    print = "Máscara: 255.255.255.0 // Função Máscara: REDE.REDE.REDE.HOST";
  }
  return print;
}

function printEndRede(oct1, oct2, oct3) {
  var print = "";
  if (oct1 >= 1 && oct1 <= 126) {
    print = "Endereço de Rede: " + oct1 + ".0.0.0";
  } else if (oct1 >= 128 && oct1 <= 191) {
    print = "Endereço de Rede: " + oct1 + "." + oct2 + ".0.0";
  } else if (oct1 >= 192 && oct1 <= 223) {
    print = "Endereço de Rede: " + oct1 + "." + oct2 + "." + oct3 + ".0";
  }
  return print;
}

function printEndHost(oct1, oct2, oct3) {
  var print = "";
  if (oct1 >= 1 && oct1 <= 126) {
    print =
      "Primeiro Host: " +
      oct1 +
      ".0.0.1\nÚltimo Host: " +
      oct1 +
      ".255.255.254";
  } else if (oct1 >= 128 && oct1 <= 191) {
    print =
      "Primeiro Host: " +
      oct1 +
      "." +
      oct2 +
      ".0.1\nÚltimo Host: " +
      oct1 +
      "." +
      oct2 +
      ".255.254";
  } else if (oct1 >= 192 && oct1 <= 223) {
    print =
      "Primeiro Host: " +
      oct1 +
      "." +
      oct2 +
      "." +
      oct3 +
      ".1\nÚltimo Host: " +
      oct1 +
      "." +
      oct2 +
      "." +
      oct3 +
      ".254";
  }
  return print;
}

function printBroadcast(oct1, oct2, oct3) {
  var print = "";
  if (oct1 >= 1 && oct1 <= 126) {
    print = "Broadcast: " + oct1 + ".255.255.255";
  } else if (oct1 >= 128 && oct1 <= 191) {
    print = "Broadcast: " + oct1 + "." + oct2 + ".255.255";
  } else if (oct1 >= 192 && oct1 <= 223) {
    print = "Broadcast: " + oct1 + "." + oct2 + "." + oct3 + ".255";
  }
  return print;
}

function printValido(oct1, oct2, oct3, oct4) {
  var print = "";
  // Classe A
  if (oct1 >= 1 && oct1 <= 126) {
    if (oct2 != 255 && oct2 != 0) {
      if (oct4 != 255 && oct4 != 0) {
        if (oct3 != 255 && oct3 != 0) {
          print = "Válido!";
        } else {
          print = "Inválido!";
        }
      } else {
        print = "Inválido!";
      }
    } else {
      print = "Inválido!";
    }
    // IP Local
  } else if (oct1 == 127) {
    print = "Inválido: IP Local";
    // Classe B
  } else if (oct1 >= 128 && oct1 <= 191) {
    if (oct3 != 255 && oct3 != 0) {
      if (oct4 != 255 && oct4 != 0) {
        print = "Válido!";
      } else {
        print = "Inválido!";
      }
    } else {
      print = "Inválido!";
    }
    // Classe C
  } else if (oct1 >= 192 && oct1 <= 223) {
    if (oct4 != 255 && oct4 != 0) {
      print = "Válido!";
    } else {
      print = "Inválido!";
    }
  }
  return print;
}
