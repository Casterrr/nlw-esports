import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { Check, GameController, CaretDown, CaretUp, Checks } from 'phosphor-react'

import { Input } from './Form/Input';
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';

interface Game {
	id: string
	title: string
}

export function CreateAdModal() {
    const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)
    const [weekDays, setWeekDays] = useState<string[]>(['0'])
    const [games, setGames] = useState<Game[]>([])

    async function handleCreateAd(event: FormEvent) {
		event.preventDefault()
		const formData = new FormData(event.target as HTMLFormElement)
		const data = Object.fromEntries(formData)

        if (!data.name) {
            return
        }

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })
            alert('Anúncio criado com sucesso!')
        } catch(err) {
            console.log(err)
            alert('Erro ao criar anúncio.')
        }
		
	}

    useEffect(() => {
        axios('http://localhost:3333/games').then(response => setGames(response.data))
        
    }, [])

    

    return ( 
        
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" >

            <Dialog.Content className="fixed bg-[#2A2634] overflow-visible py-6 px-8 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
              <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

              <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="game" className="font-semibold">Qual o game?</label>
                    <Select.Root name="game" >
                        <Select.Trigger aria-label="Game" className='inline-flex items-center justify-between bg-zinc-900 py-3 px-4 rounded text-sm text-zinc-500 '>
                            <Select.Value placeholder="Selecione o game que deseja jogar" className='' />
                            <Select.Icon>
                                <CaretDown size={24} />
                            </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal >
                            <Select.Content id="game" className=' bg-zinc-900  rounded text-sm text-zinc-500 py-2' >
                                <Select.ScrollUpButton>
                                    <CaretUp />
                                </Select.ScrollUpButton>
                                <Select.Viewport  className='grid grid-cols-1 gap-1'>

                                    {games.map( (game) => {
                                        return (
                                            <Select.Item key={game.id} value={game.id}  className='flex relative px-2 py-3 mx-2 rounded text-zinc-500 cursor-pointer bg-zinc-900 hover:bg-zinc-800'>
                                                <Select.ItemText>{game.title}</Select.ItemText>
                                                <Select.ItemIndicator>
                                                    <Checks size={18} className='absolute ml-2 text-violet-500' />
                                                </Select.ItemIndicator>
                                            </Select.Item>
                                        )
                                    } )}
         
                                    <Select.Separator />
                                </Select.Viewport>
                                <Select.ScrollDownButton  >
                                    <CaretDown />
                                </Select.ScrollDownButton>
                            </Select.Content>
                        </Select.Portal>
                    </Select.Root>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Seu nome (ou nickname)</label>
                  <Input name="name" id="name" placeholder="Como te chamam dentro do game?" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                    <Input  name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="discord">Qual o seu Discord?</label>
                    <Input name="discord" id="discord" type="text" placeholder="Usuario#0000" />
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays">Quando costuma jogar?</label>
                    
                    <ToggleGroup.Root
								type='multiple'
								className='grid grid-cols-4 gap-2'
								onValueChange={setWeekDays}
								value={weekDays}
                    >
                        <ToggleGroup.Item
                            value='0'
                            title='Domingo'
                            className={`w-8 h-8 rounded ${
                                weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'
                            }`}
                        >
                            D
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value='1'
                            title='Segunda'
                            className={`w-8 h-8 rounded ${
                                weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'
                            } `}
                        >
                            S
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value='2'
                            title='Terça'
                            className={`w-8 h-8 rounded ${
                                weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'
                            } `}
                        >
                            T
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value='3'
                            title='Quarta'
                            className={`w-8 h-8 rounded ${
                                weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'
                            } `}
                        >
                            Q
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value='4'
                            title='Quinta'
                            className={`w-8 h-8 rounded ${
                                weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'
                            } `}
                        >
                            Q
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value='5'
                            title='Sexta'
                            className={`w-8 h-8 rounded ${
                                weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'
                            } `}
                        >
                            S
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value='6'
                            title='Sábado'
                            className={`w-8 h-8 rounded ${
                                weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'
                            } `}
                        >
                            S
                        </ToggleGroup.Item>
                    </ToggleGroup.Root>
                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hourStart">Qual horário do dia?</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input  name="hourStart" id="hourStart" type="time" placeholder="De" />
                      <Input  name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                    </div>
                  </div>
                </div>
                <label className="mt-2 flex gap-2 text-sm items-center">
                <Checkbox.Root
                    className='w-6 h-6 p-1 rounded bg-zinc-900'
                    checked={useVoiceChannel}
                    onCheckedChange={(checked) => {
                        checked ? setUseVoiceChannel(true) : setUseVoiceChannel(false)
                    }}
                >
                    <Checkbox.Indicator>
                        <Check className='w-4 h-4 text-emerald-400' />
                    </Checkbox.Indicator>
                </Checkbox.Root>
                  <p className=' cursor-pointer'>
                    Costumo me conectar ao chat de voz
                  </p>
                </label>

                <footer className="mt-4 flex justify-end gap-4">
                  <Dialog.Close
                    type="button"
                    className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                  >
                    Cancelar
                  </Dialog.Close>
                  <button
                    type="submit"
                    className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                  >
                    <GameController className="w-6 h-6" />
                    Encontrar duo
                  </button>
                </footer>
              </form>
              
            </Dialog.Content>

          </Dialog.Overlay>
        </Dialog.Portal>
      
     );
}
