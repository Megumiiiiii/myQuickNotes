---
locale: id
---

---

<div align="center">

# CESS Storage Node

[![Twitter](https://img.shields.io/twitter/follow/megumii?style=social)](https://twitter.com/megumii_tez)

[![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23e609e6)](https://github.com/sponsors/Megumiiiiii)

[![](https://img.shields.io/static/v1?label=Telegram&message=%E2%9D%A4&logo=Telegram&color=%23e609e6)](https://t.me/KatouMegumii)

<img align="top" src="https://komarev.com/ghpvc/?username=Megumiiiiii&color=e609e6&style=plastic&label=Visitors" height='35'/>

</div>

#

## Official Links
- [Docs](https://docs.cess.cloud/cess-build-book/storage-miner)
- [Discord](https://discord.gg/mj3u57BkDv)
- [Twitter](https://twitter.com/CESS_Storage)

#

## Spek Minimal

| Spek | Ukuran |
|----------|----------|
| CPU | 4 |
| RAM | 8 GB |
| SSD | 100 GB |
| Bandwith | 5 MB |

## Setup Awal

1. Buatlah 2 wallet di [Polkadot](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ftestnet-rpc1.cess.cloud%2Fws%2F#/accounts)
2. Lalu ambil faucet [DISINI](https://testnet-faucet.cess.cloud/)
3. Wallet pertama digunakan untuk menerima hasil mining
4. Wallet kedua digunakan untuk mining

### Buka Port

```bash
sudo ufw allow ssh; sudo ufw allow 4001; sudo ufw allow 15001; sudo ufw enable
```

### Install Docker ( Skip kalo udah )

```bash
sudo apt update; sudo apt upgrade -y
```

```bash
sudo apt-get update && sudo apt install jq git && sudo apt install apt-transport-https ca-certificates curl software-properties-common -y && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - && sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable" && sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin -y
```

### Install CESS

```bash
mkdir -p /opt/cess
git clone https://github.com/CESSProject/cess-nodeadm
cd cess-nodeadm
git checkout tags/v0.4.4
./install.sh
```

### Set Config

- Paste ini

```bash
cess profile testnet
```

```bash
cess config set
```

- Ketik `storage` kemudian enter

- Paste address dari wallet pertama

- Lalu paste pharse dari wallet kedua

- Ketik `/opt/cess`

- Terkahir, isi dengan `100`

## Start Node

```bash
cess reload
```

lalu

```bash
cess start
```

### Daftar Command

- Cek logs chain

```bash
docker logs -f chain
```

- Cek logs bucket

```bash
docker logs -f bucket
```

- Cek status

```bash
cess bucket stat
```
## Jika ada Update

- Versi terakhir node bisa cek [DISINI](https://github.com/CESSProject/cess-nodeadm/tags)

### Cara Update

#### Stop dulu

```bash
cess stop
cess down
```

#### Hapus

```bash
cess purge
```

#### Hapus folder dan file yang lama

```bash
cd cess-nodeadm
git checkout tags/SESUAI_VERSITERBARU_JIKA_SUDAH_ADA
```

#### Setelah itu mulai kembali dari langkah [Set Config](#set-config)

## ⚠️ Jika ingin menghapus node ⚠️

```bash
cess down; cess purge
docker rmi cesslab/cess-bucket; docker rmi cesslab/cess-chain; docker rmi cesslab/config-gen; docker rmi containrrr/watchtower
```

#
