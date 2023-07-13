<script setup lang="js">
  const notes = ref([
      {id:1,value:"text"}
  ])

  const loadNotes = async () => {
    const { data  } = await useFetch('/api/notes')

    notes.value = data.value.data
  }

  await loadNotes()

  const passwords = ref([
    {id:1,value:"text", title: 'value'}
  ])

  const loadPasswords = async () => {
    const { data  } = await useFetch('/api/passwords')

    passwords.value = data.value.data
  }

  await loadPasswords()



  const newNote = ref('')
  const newPassword = ref({
    value: '',
    title: ''
  })

  const hidePassword = (pass)=>{
    return '*'.repeat(pass.length)
  }

  const addNote = async () => {
    if (!newNote.value) return;

    const _notes = notes.value
    await useFetch('/api/note', {
      method: "POST",
      body: {
        value: newNote.value
      }
    })
    _notes.push({
      id: _notes.length,
      value: newNote.value
    })
    notes.value = _notes
    newNote.value = ''
  }

  const addPassword = async () => {
    if (!newPassword.value) return;

    const _passwords = passwords.value

    await useFetch('/api/password', {
      method: "POST",
      body: {
        value: newPassword.value.value,
        title: newPassword.value.title
      }
    })

    _passwords.push({
      id: _passwords.length,
      value: newPassword.value.value,
      title: newPassword.value.title
    })
    passwords.value = _passwords
    newPassword.value = {
      value: '',
      title: ''
    }
  }

  const copyNote2Clipboard = (id)=>{
    const value = notes.value.find((el)=> el.id === id).value
    navigator.clipboard.writeText(value)
  }

  const deleteNote = async (id) => {
    await useFetch(`/api/note/${id}`, {
      method: "DELETE"
    })
    notes.value = notes.value.filter(el => el.id !== id)
  }

  const deletePassword = async (id) => {
    await useFetch(`/api/password/${id}`, {
      method: "DELETE"
    })
    passwords.value = passwords.value.filter(el => el.id !== id)

  }

  const copyPassword2Clipboard = (id)=>{
    const value = passwords.value.find((el)=> el.id === id).value
    navigator.clipboard.writeText(value)
  }
</script>

<template>
  <div class="flex justify-center mt-6">
    <div class="notes w-100 p-4 border border-1">
      <!--   Note part   -->
      <p>Notes</p>
      <hr>
      <div class="max-h-40 overflow-auto">
        <div v-for="(note, ind) in notes" class="flex py-2">
          <div class="w-40 mt-1">{{ind+1}}. {{note.value}}</div>
          <button class="pt-1 px-2 cursor-pointer" @click="copyNote2Clipboard(note.id)"><IconCopy /></button>
          <button class="pt-1 px-2 cursor-pointer" @click="deleteNote(note.id)"><IconDelete /></button>
        </div>
      </div>

      <div class="py-4">
        <input type="text" v-model="newNote" class="border border-1 rounded rounded-8 px-4 py-2 mr-2">
        <button class="btn btn-blue" @click="addNote">Save</button>
      </div>

      <hr>
      <!--   Password part   -->
      <p class="pt-4">Passwords</p>
      <hr>
      <div class="max-h-40 overflow-auto">
        <div v-for="(pass, ind) in passwords" class="flex py-2">
          <div class="w-40 mt-1">
            {{ind+1}}. {{pass.title}} : ****
          </div>
          <button class="pt-1 px-2 cursor-pointer" @click="copyPassword2Clipboard(pass.id)"><IconCopy /></button>
          <button class="pt-1 px-2 cursor-pointer" @click="deletePassword(pass.id)"><IconDelete /></button>
        </div>
      </div>

      <div class="py-4">
        <input type="text" placeholder="Enter title" v-model="newPassword.title" class="border border-1 rounded rounded-8 px-4 py-2 mr-2">
        <input type="text" placeholder="Enter password" v-model="newPassword.value" class="border border-1 rounded rounded-8 px-4 py-2 mr-2">
        <button class="btn btn-blue" @click="addPassword">Save</button>
      </div>

    </div>




  </div>
</template>

<style scoped>
  .btn {
    @apply font-bold py-2 px-4 rounded;
  }
  .btn-blue {
    @apply bg-blue-500 text-white;
  }
  .btn-blue:hover {
    @apply bg-blue-700;
  }
</style>