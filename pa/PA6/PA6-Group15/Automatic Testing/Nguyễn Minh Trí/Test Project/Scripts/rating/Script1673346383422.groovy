import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import static com.kms.katalon.core.testobject.ObjectRepository.findWindowsObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.cucumber.keyword.CucumberBuiltinKeywords as CucumberKW
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testng.keyword.TestNGBuiltinKeywords as TestNGKW
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.windows.keyword.WindowsBuiltinKeywords as Windows
import internal.GlobalVariable as GlobalVariable
import org.openqa.selenium.Keys as Keys

WebUI.openBrowser('')

WebUI.navigateToUrl('http://localhost:3000/')

WebUI.click(findTestObject('Object Repository/Page_Home/button_ng nhp'))

WebUI.setText(findTestObject('Object Repository/Page_Login/input_ng nhp_username'), 'a')

WebUI.setEncryptedText(findTestObject('Object Repository/Page_Login/input_ng nhp_password'), 'J7R4ejOak4Y=')

WebUI.click(findTestObject('Object Repository/Page_Login/button_ng nhp'))

WebUI.click(findTestObject('Object Repository/Page_Home/img_Nng 3 Li Ha Ca Cha_card-img-top'))

WebUI.click(findTestObject('Object Repository/Page_Phim Gi Gi Lm Chiu 2/input_Rating 1010 (1 lt)_star-9'))

WebUI.click(findTestObject('Object Repository/Page_Phim Gi Gi Lm Chiu 2/input_Rating 9.510 (2 lt)_star-6'))

WebUI.click(findTestObject('Object Repository/Page_Phim Gi Gi Lm Chiu 2/input_Rating 810 (2 lt)_star-2'))

WebUI.click(findTestObject('Object Repository/Page_Phim Gi Gi Lm Chiu 2/input_Rating 610 (2 lt)_star-10'))

WebUI.click(findTestObject('Object Repository/Page_Phim Gi Gi Lm Chiu 2/input_Rating 1010 (2 lt)_star-1'))

WebUI.click(findTestObject('Object Repository/Page_Phim Gi Gi Lm Chiu 2/input_Rating 9.510 (2 lt)_star-6'))

