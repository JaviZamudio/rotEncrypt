import { useState } from "react"

function App() {
  const [encryptedText, setEncryptedText] = useState('')
  const [decryptedText, setDecryptedText] = useState('')
  const [rot, setRot] = useState(0)

  const handleEncrypt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ decryptedText, rot })

    try {
      const response = await fetch("https://kn7laevy35jfjdftgwmuip7noa0hatny.lambda-url.us-east-1.on.aws/", {
        method: 'POST',
        body: JSON.stringify({
          text: decryptedText,
          rot
        })
      })

      const body = await response.text()
      console.log(body)

      setEncryptedText(body)
    } catch (error) {
      console.log(error)
    }
  }

  // https://4acnbw4ipdgirbvrdl5cemi2l40gxthe.lambda-url.us-east-1.on.aws/
  const handleDecrypt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch("https://4acnbw4ipdgirbvrdl5cemi2l40gxthe.lambda-url.us-east-1.on.aws/", {
        method: 'POST',
        body: JSON.stringify({
          text: encryptedText,
          rot
        })
      })

      const decrypted = await response.text()
      console.log(decrypted)

      setDecryptedText(decrypted)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center text-white bg-[#22577a] h-20 flex items-center justify-center">
        RotEncrypt
      </h1>

      {/* Rotation */}
      <div className="flex flex-col items-center justify-center mt-20 mb-8">
        <h2 className="text-2xl font-semibold">Rotation</h2>
        <div className="flex items-center justify-center gap-4 my-2">
          <button
            className="bg-[#38a3a5] rounded-md text-2xl font-bold text-white flex items-center justify-center w-8 pb-1"
            onClick={() => rot > 0 && setRot(rot - 1)}
          >
            -
          </button>

          <p className="text-2xl font-bold">{rot}</p>

          <button
            className="bg-[#38a3a5] rounded-md text-2xl font-bold text-white flex items-center justify-center w-8 pb-1"
            onClick={() => rot < 26 && setRot(rot + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* Forms */}
      <div className="flex flex-row items-center justify-evenly gap-8">
        {/* Encrypt */}
        <form onSubmit={handleEncrypt} className="flex flex-col items-center justify-center w-1/3">
          <h2 className="text-2xl font-semibold w-full text-center">Encrypt</h2>
          <textarea
            name="decrypted"
            id="decrypted"
            placeholder="Text to encrypt"
            value={decryptedText}
            onChange={(e) => setDecryptedText(e.target.value)}
            className="w-full h-40 p-4 border rounded-md resize-none my-6 border-[#22577a]"
            autoComplete="off"
            spellCheck="false"
          />

          <button type="submit" className="bg-[#38a3a5] rounded-md text-lg font-bold text-white flex items-center justify-center w-1/2 py-2 my-2">
            <span className="mr-4">Encrypt</span> →
          </button>
        </form>

        {/* Decrypt */}
        <form onSubmit={handleDecrypt} className="flex flex-col items-center justify-center w-1/3">
          <h2 className="text-2xl font-semibold w-full text-center">Decrypt</h2>
          <textarea
            name="encrypted"
            id="encrypted"
            value={encryptedText}
            onChange={(e) => setEncryptedText(e.target.value)}
            placeholder="Text to decrypt"
            className="w-full h-40 p-4 border rounded-md resize-none my-6 border-[#22577a]"
            autoComplete="off"
            spellCheck="false"
          />

          <button type="submit" className="bg-[#38a3a5] rounded-md text-lg font-bold text-white flex items-center justify-center w-1/2 py-2 my-2">
            ← <span className="ml-4">Decrypt</span>
          </button>
        </form>
      </div>

    </>
  )
}

export default App