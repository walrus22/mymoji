from io import BytesIO
import win32clipboard
import win32api, win32gui, win32con, win32process, win32com
import ctypes
import psutil
from PIL import Image
from pynput.keyboard import Key
from pynput.keyboard import Listener

import keyboard
import sys
import json

# import logging
# log = logging.getLogger(__name__)

imm = ctypes.windll.imm32
IMC_GETOPENSTATUS = 0x0005
user32 = ctypes.WinDLL('user32', use_last_error=True)

def send_to_clipboard(clip_type, filepath):
    # filepath = 'test.png'
    image = Image.open(filepath)
    output = BytesIO()
    image.convert("RGB").save(output, "BMP")
    data = output.getvalue()[14:]
    output.close()
    # log.info(data)
    # image.show()

    win32clipboard.OpenClipboard()
    win32clipboard.EmptyClipboard()
    win32clipboard.SetClipboardData(clip_type, data)
    win32clipboard.CloseClipboard()

class Tracker():
    def __init__(self):
        self.keyboard_listener = Listener(on_press=self.on_press, on_release=self.on_release)
        self.text_length = 100
        self.text_buffer = ctypes.create_unicode_buffer(self.text_length)
        self.favorites = {}

    def run(self): # 필수임. 왜지?
        print("start running")
        self.keyboard_listener.start()
        # self.keyboard_listener.join()

    def send_image_kakao(self, hwnd, filepath):
        # log.info(keyword)
        user32.SendMessageW(hwnd, win32con.WM_SETTEXT, 0, "")
        self.text_buffer = ctypes.create_unicode_buffer(self.text_length)
        send_to_clipboard(win32clipboard.CF_DIB, filepath)
        keyboard.press_and_release('ctrl+v')

    def on_press(self, key):
        # print(key)
        # sys.stdout.flush()
        # print(self.favorites)
        # sys.stdout.flush()
        # print(self.text_buffer.value)
        pass

    def on_release(self, key):
        # log.info(self.text_buffer.value)
        # log.info(psutil.Process(pid[-1]).name())

        # if key == Key.f3:
        #     self.stop_signal = False
        #     return self.stop_signal  # In case, the key is "Esc" then stopping the keylogger

        hwnd = win32gui.GetForegroundWindow()
        pid = win32process.GetWindowThreadProcessId(hwnd)


        if psutil.Process(pid[-1]).name() == "KakaoTalk.exe" :
            hwnd_kakao = win32gui.FindWindowEx(hwnd, None, "RICHEDIT50W" , None)
            user32.SendMessageW(hwnd_kakao, win32con.WM_GETTEXT, self.text_length, self.text_buffer)

            if self.text_buffer.value in self.favorites:
              print("gotcha")
              sys.stdout.flush()
              self.send_image_kakao(hwnd_kakao, 'test.png')

            # 최적화를 위해 정렬?
            # :ㅋㅋ 엔터해야 나오게 할까? :ㅋㅋㅋ랑 :ㅋㅋ랑 구분못하니까

        # elif psutil.Process(pid[-1]).name() == "WINWORD.EXE" :
        #     log.info('hi')

        # elif psutil.Process(pid[-1]).name() == "Discord.exe" :
        #     log.info('hi')

        # elif psutil.Process(pid[-1]).name() == "chrome.exe" :
        #     log.info('hi')

        # elif psutil.Process(pid[-1]).name() == "line?.exe" :
        #     log.info('hi')


# if __name__ == '__main__':


while True:
  try:
    print("######### python script is running #########")
    sys.stdout.flush()

    keyboard_listener = Tracker()
    keyboard_listener.run()

    while True:
      data = sys.stdin.readline()
      keyboard_listener.favorites = json.loads(data)
      print(data)
      sys.stdout.flush()

  except Exception as e:
    print(e)
    sys.stdout.flush()
    continue


# if keyboard_listener.stop_signal == False:
#     print("######### python script is exited #########")
#     sys.stdout.flush()
#     exit()
