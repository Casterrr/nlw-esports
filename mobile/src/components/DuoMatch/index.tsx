import {
	View,
	Modal,
	ModalProps,
	Text,
	TouchableOpacity,
	Alert,
	ActivityIndicator,
} from 'react-native'
import { styles } from './styles'
import { MaterialIcons } from '@expo/vector-icons'
import { CheckCircle } from 'phosphor-react-native'
import { THEME } from '../../theme'
import { Heading } from '../Heading'
import * as Clipboard from 'expo-clipboard'
import React, { useState } from 'react'

interface DuoMatchProps extends ModalProps {
	discord: string
	onClose: () => void
}

export function DuoMatch({ discord, onClose, ...rest }: DuoMatchProps) {
	const [isCoping, setIsCoping] = useState(false)

	async function handleCopyDiscordToClipBoard() {
		setIsCoping(true)
		await Clipboard.setStringAsync(discord)
		Alert.alert('Discord Copiado!', 'Usuário copiado para área de transferência.')
		setIsCoping(false)
	}

	return (
		<Modal {...rest} transparent statusBarTranslucent animationType='fade'>
			<View style={styles.container}>
				<View style={styles.content}>
					<TouchableOpacity style={styles.closeIcon} onPress={onClose}>
						<MaterialIcons
							name='close'
							size={20}
							color={THEME.COLORS.CAPTION_500}
						/>
					</TouchableOpacity>
					<CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight='bold' />
					<Heading
						title="Let's Play!"
						subtitle='Agora é só começar a jogar!'
						style={{
							alignItems: 'center',
							marginTop: 24,
						}}
					/>
					<Text style={styles.label}>Adicione no Discord</Text>
					<TouchableOpacity
						style={styles.discordButton}
						onPress={handleCopyDiscordToClipBoard}
						disabled={isCoping}
					>
						<Text style={styles.discord}>
							{isCoping ? (
								<ActivityIndicator color={THEME.COLORS.PRIMARY} />
							) : (
								discord
							)}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	)
}